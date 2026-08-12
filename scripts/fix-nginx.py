#!/home/z/.venv/bin/python3
"""Fix nginx: redirect www to non-www for WhatsApp OG preview"""
import paramiko

NEW_CONF = r"""# HTTPS www -> non-www redirect
server {
    server_name www.dwellchroniclesgh.com;
    return 301 https://dwellchroniclesgh.com$request_uri;

    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/dwellchroniclesgh.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dwellchroniclesgh.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

# HTTPS - canonical non-www
server {
    server_name dwellchroniclesgh.com;

    location / {
        proxy_pass http://127.0.0.1:3006;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/dwellchroniclesgh.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/dwellchroniclesgh.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

# HTTP -> HTTPS redirect for both
server {
    server_name dwellchroniclesgh.com www.dwellchroniclesgh.com;
    return 301 https://dwellchroniclesgh.com$request_uri;

    listen 80;
    listen [::]:80;
}
"""

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('153.75.247.4', port=22, username='root', password='Do1_BuZe4_M1-V6v1_S4', timeout=15)

# Backup original
stdin, stdout, stderr = c.exec_command('cp /etc/nginx/conf.d/dwellchroniclesgh.com.conf /etc/nginx/conf.d/dwellchroniclesgh.com.conf.bak', timeout=10)
stdout.channel.recv_exit_status()
print('Backup created')

# Write new config
sftp = c.open_sftp()
with sftp.open('/etc/nginx/conf.d/dwellchroniclesgh.com.conf', 'w') as f:
    f.write(NEW_CONF)
sftp.close()
print('Config written')

# Test nginx config
stdin, stdout, stderr = c.exec_command('nginx -t 2>&1', timeout=10)
result = stdout.read().decode()
print('nginx -t:', result)

if 'successful' in result:
    stdin, stdout, stderr = c.exec_command('systemctl reload nginx 2>&1', timeout=10)
    stdout.channel.recv_exit_status()
    print('nginx reloaded!')
else:
    print('ERROR: nginx config test failed, restoring backup')
    stdin, stdout, stderr = c.exec_command('cp /etc/nginx/conf.d/dwellchroniclesgh.com.conf.bak /etc/nginx/conf.d/dwellchroniclesgh.com.conf && systemctl reload nginx', timeout=10)
    stdout.channel.recv_exit_status()
    print('Backup restored')

c.close()
