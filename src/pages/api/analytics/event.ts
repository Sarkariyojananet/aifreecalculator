/**
 * POST /api/analytics/event
 * Retired custom analytics endpoint: returns 204 immediately with 0 Worker CPU and 0 D1 writes.
 * Retained for backward-compatibility with any in-flight or cached client beacons.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

function create204Response(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET, HEAD',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

export const POST: APIRoute = async () => create204Response();
export const GET: APIRoute = async () => create204Response();
export const OPTIONS: APIRoute = async () => create204Response();
export const HEAD: APIRoute = async () => create204Response();
