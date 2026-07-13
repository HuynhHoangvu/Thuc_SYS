import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@/generated/prisma/client';
import { AppError } from './errors';

export function ok(data: unknown, status = 200, meta?: Record<string, unknown>) {
  return NextResponse.json({ success: true, data, ...(meta ? { meta } : {}) }, { status });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function withErrorHandling(handler: (req: Request, ctx: any) => Promise<NextResponse>) {
  return async (req: Request, ctx: any) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      if (err instanceof ZodError) {
        return NextResponse.json(
          { success: false, message: 'Validation error', errors: err.flatten().fieldErrors },
          { status: 400 }
        );
      }
      if (err instanceof AppError) {
        return NextResponse.json({ success: false, message: err.message }, { status: err.statusCode });
      }
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
      }
      console.error(err);
      return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
  };
}
