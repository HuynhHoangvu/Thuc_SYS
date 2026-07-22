import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
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
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return NextResponse.json({ success: false, message: 'Resource not found' }, { status: 404 });
      }
      if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
        return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
      }
      if (err && typeof err === 'object' && 'code' in err && (err as { code?: number }).code === 11000) {
        return NextResponse.json({ success: false, message: 'Resource already exists' }, { status: 409 });
      }
      console.error(err);
      return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
  };
}
