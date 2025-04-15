import { NextRequest, NextResponse } from 'next/server';
import { IProject } from '@/types/Project';

let mockProjects: IProject[] = [
  {
    projectId: 'p_032',
    projectName: 'IGI - I\'m Going in',
    description: 'Lorem ipsum dor set ikiba',
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    projectManager: 'Agent Snow',
    isFavourite: true,
  },
  {
    projectId: 'p_132',
    projectName: 'Project - X',
    description: 'Why is what a question?',
    startDate: '2025-04-01',
    endDate: '2025-12-31',
    projectManager: 'Musk Melon',
    isFavourite: false,
  },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  
  const fail = Math.random() < 0.2; // 20% chances of mocking failure

  if (fail) {
    return NextResponse.json({ error: 'Simulated Server Error in GET. Please refresh' }, { status: 500 });
  }

  return NextResponse.json(mockProjects);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.projectId || !body.projectName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const exists = mockProjects.some(p => p.projectId === body.projectId);
    if (exists) {
      return NextResponse.json({ error: 'Project with this ID already exists' }, { status: 409 });
    }

    const newProject = { ...body, isFavourite: false };
    mockProjects.push(newProject);

    return NextResponse.json({ message: 'Project created', data: newProject });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const index = mockProjects.findIndex(p => p.projectId === body.projectId);

    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    mockProjects[index] = {
      ...mockProjects[index],
      ...body,
    };

    return NextResponse.json({ message: 'Project updated', data: mockProjects[index] });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const projectId = req.nextUrl.searchParams.get('projectId');

    if (!projectId) {
      return NextResponse.json({ error: 'projectId is required' }, { status: 400 });
    }

    const index = mockProjects.findIndex(p => p.projectId === projectId);
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    mockProjects.splice(index, 1);

    return NextResponse.json({ message: 'Project deleted' });
  } catch {
    return NextResponse.json({ error: 'Unexpected error during deletion' }, { status: 500 });
  }
}
