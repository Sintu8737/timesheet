import { timesheets } from '@/data/mockData';

export async function GET(request, { params }) {
  const { id } = params;
  const timesheet = timesheets.find((ts) => ts.id === parseInt(id));
  
  if (!timesheet) {
    return Response.json({ error: 'Timesheet not found' }, { status: 404 });
  }
  
  return Response.json(timesheet);
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  
  const timesheetIndex = timesheets.findIndex((ts) => ts.id === parseInt(id));
  
  if (timesheetIndex === -1) {
    return Response.json({ error: 'Timesheet not found' }, { status: 404 });
  }
  
  const updatedTimesheet = {
    ...timesheets[timesheetIndex],
    ...body,
  };
  
  timesheets[timesheetIndex] = updatedTimesheet;
  
  return Response.json(updatedTimesheet);
}

export async function DELETE(request, { params }) {
  const { id } = params;
  const timesheetIndex = timesheets.findIndex((ts) => ts.id === parseInt(id));
  
  if (timesheetIndex === -1) {
    return Response.json({ error: 'Timesheet not found' }, { status: 404 });
  }
  
  timesheets.splice(timesheetIndex, 1);
  
  return Response.json({ message: 'Timesheet deleted successfully' });
}
