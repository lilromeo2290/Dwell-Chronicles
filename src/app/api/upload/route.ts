import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync, symlinkSync } from 'fs';

function getUploadDir(): string {
  // In standalone production, write to the standalone public dir
  // so uploaded files are immediately served
  const standalonePublic = join(process.cwd(), '.next', 'standalone', 'public', 'uploads', 'apartments');
  const devPublic = join(process.cwd(), 'public', 'uploads', 'apartments');

  if (existsSync(join(process.cwd(), '.next', 'standalone'))) {
    // Production standalone mode
    if (!existsSync(standalonePublic)) {
      mkdir(standalonePublic, { recursive: true });
      // Also create symlink in source public so git can track if needed
      if (!existsSync(devPublic)) {
        mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
        try { symlinkSync(standalonePublic, devPublic, 'junction'); } catch { /* ignore */ }
      }
    }
    return standalonePublic;
  }
  return devPublic;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const UPLOAD_DIR = getUploadDir();

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const uploadedFiles: { url: string; alt: string }[] = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File type "${file.type}" not allowed. Use JPG, PNG, WebP, GIF, or AVIF.` },
          { status: 400 }
        );
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" is too large. Max 5MB.` },
          { status: 400 }
        );
      }

      // Generate unique filename
      const ext = file.name.split('.').pop() || 'jpg';
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 8);
      const filename = `${timestamp}-${random}.${ext}`;
      const filepath = join(UPLOAD_DIR, filename);

      // Write file to disk
      const bytes = await file.arrayBuffer();
      await writeFile(filepath, Buffer.from(bytes));

      uploadedFiles.push({
        url: `/uploads/apartments/${filename}`,
        alt: file.name.replace(/\.[^/.]+$/, ''),
      });
    }

    return NextResponse.json({
      count: uploadedFiles.length,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
