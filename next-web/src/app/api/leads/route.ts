import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

interface LeadRequest {
  name: string;
  email?: string;
  phone?: string;
  message: string;
  source?: string; // e.g., 'contact_form', 'service_inquiry'
}

export async function POST(request: Request) {
  try {
    // Initialize Supabase client
    const supabase = await createServerSupabaseClient();
    
    // Parse request body
    const body: LeadRequest = await request.json();
    const { name, email, phone, message, source = 'contact_form' } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name and message are required' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert lead into database
    const { data: newLead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: name.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        message: message.trim(),
        source: source,
        status: 'new', // Default status for new leads
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (leadError) {
      console.error('Error creating lead:', leadError);
      return NextResponse.json(
        { error: 'Failed to create lead', details: leadError.message },
        { status: 500 }
      );
    }

    if (!newLead) {
      return NextResponse.json(
        { error: 'Failed to create lead: No lead returned' },
        { status: 500 }
      );
    }

    // Return success response
    return NextResponse.json(
      { 
        id: newLead.id,
        message: 'Lead created successfully',
        lead: {
          id: newLead.id,
          name: newLead.name,
          status: newLead.status,
          created_at: newLead.created_at,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error in POST /api/leads:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
