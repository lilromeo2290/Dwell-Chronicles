#!/home/z/.venv/bin/python3
import paramiko

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('153.75.247.4', port=22, username='root', password='Do1_BuZe4_M1-V6v1_S4', timeout=15)

# Clean build deploy
cmd = """cd /root/dwellchronicles && \
git fetch origin && \
git reset --hard origin/main && \
bun install && \
bunx prisma generate && \
rm -rf .next && \
bun run build && \
pm2 restart dwellchronicles && \
pm2 flush dwellchronicles"""

print('Starting clean deploy...')
stdin, stdout, stderr = c.exec_command(cmd, timeout=600)

# Stream output
import select
channel = stdout.channel
while True:
    if channel.recv_ready():
        data = channel.recv(4096).decode('utf-8', errors='replace')
        print(data, end='', flush=True)
    if channel.recv_stderr_ready():
        data = channel.recv_stderr(4096).decode('utf-8', errors='replace')
        print(data, end='', flush=True)
    if channel.exit_status_ready():
        # Read any remaining
        while channel.recv_ready():
            print(channel.recv(4096).decode('utf-8', errors='replace'), end='', flush=True)
        while channel.recv_stderr_ready():
            print(channel.recv_stderr(4096).decode('utf-8', errors='replace'), end='', flush=True)
        break

print()
print('Exit code:', channel.recv_exit_status())
c.close()
