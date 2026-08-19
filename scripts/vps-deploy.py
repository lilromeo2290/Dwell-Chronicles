#!/home/z/.venv/bin/python3
"""VPS Deploy Script for Dwell Chronicles"""

import paramiko
import sys
import time

VPS_HOST = "153.75.247.4"
VPS_USER = "root"
VPS_PASS = "Do1_BuZe4_M1-V6v1_S4"
VPS_PROJECT = "/root/dwellchronicles"

def ssh_exec(command: str, timeout: int = 600) -> tuple[int, str, str]:
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(VPS_HOST, port=22, username=VPS_USER,
                    password=VPS_PASS, timeout=15,
                    banner_timeout=15, auth_timeout=15)
    try:
        stdin, stdout, stderr = client.exec_command(command, timeout=timeout)
        exit_code = stdout.channel.recv_exit_status()
        out = stdout.read().decode('utf-8', errors='replace')
        err = stderr.read().decode('utf-8', errors='replace')
        return exit_code, out, err
    finally:
        client.close()

def deploy():
    print('Deploying to VPS...')
    cmd = (
        f'cd {VPS_PROJECT} && '
        'git fetch origin && '
        'git reset --hard origin/main && '
        'bun install && '
        'bunx prisma generate && '
        'rm -rf .next && '
        'bun run build && '
        'pm2 restart dwellchronicles && '
        'pm2 flush dwellchronicles && '
        'echo DEPLOY_COMPLETE'
    )
    code, out, err = ssh_exec(cmd, timeout=600)
    
    # Show last 30 lines of output
    lines = (out + err).strip().split('\n')
    print('\n'.join(lines[-40:]))
    print(f'\nExit code: {code}')
    if 'DEPLOY_COMPLETE' in out:
        print('Deploy SUCCESS')
    return code

def run_seed(script: str = 'scripts/seed-property1.ts'):
    print(f'Running seed: {script}')
    cmd = f'cd {VPS_PROJECT} && bun run {script}'
    code, out, err = ssh_exec(cmd, timeout=120)
    print(out[-1000:] if out else '(empty)')
    if err: print('ERR:', err[-500:])
    return code

def run_cmd(command: str):
    code, out, err = ssh_exec(command, timeout=60)
    print(out if out else '(empty)')
    if err: print('ERR:', err[:500])
    return code

if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == 'seed':
            run_seed(sys.argv[2] if len(sys.argv) > 2 else 'scripts/seed-property1.ts')
        elif sys.argv[1] == 'cmd':
            run_cmd(' '.join(sys.argv[2:]))
        elif sys.argv[1] == 'status':
            run_cmd('pm2 status --no-color')
        elif sys.argv[1] == 'logs':
            run_cmd('tail -30 /root/.pm2/logs/dwellchronicles-error.log')
        else:
            run_cmd(' '.join(sys.argv[1:]))
    else:
        deploy()