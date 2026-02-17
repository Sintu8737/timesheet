import { timesheets } from '@/data/mockData';

export async function GET() {
  return Response.json(timesheets);
}

export async function POST(request) {
  const body = await request.json();
  
  const newEntry = {
    id: Date.now(),
    ...body,
  };

  return Response.json(newEntry);
}
