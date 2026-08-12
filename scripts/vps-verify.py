import paramiko, json

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect('153.75.247.4', port=22, username='root', password='Do1_BuZe4_M1-V6v1_S4', timeout=15)

# Restart
s1, o1, e1 = c.exec_command('pm2 restart dwellchronicles && pm2 flush dwellchronicles', timeout=30)
print(o1.read().decode().strip()[-100:])

import time
time.sleep(3)

# Check Property 1 API
s2, o2, e2 = c.exec_command('curl -s http://localhost:3006/api/apartments?area=Adaklu+Road', timeout=15)
data = json.loads(o2.read().decode())
print(f"Property 1 apartments: {data['total']}")
for a in data['apartments']:
    imgs = a.get('images', [])
    print(f"  {a['code']}: {len(imgs)} imgs - {imgs[0]['url'] if imgs else 'NO IMG'}")

# Check all areas in general listing
s3, o3, e3 = c.exec_command('curl -s http://localhost:3006/api/apartments', timeout=15)
data3 = json.loads(o3.read().decode())
areas = set(a['area'] for a in data3['apartments'])
print(f"\nAll apartments: {data3['total']}")
print(f"Areas: {areas}")

c.close()