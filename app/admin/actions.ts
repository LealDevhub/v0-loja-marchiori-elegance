'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// ============ GRAVATAS ============

export async function createTie(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    image_url: formData.get('image_url') as string || null,
    category: formData.get('category') as string,
    color: formData.get('color') as string || null,
    price: parseFloat(formData.get('price') as string),
    stock: parseInt(formData.get('stock') as string),
    active: formData.get('active') === 'true',
  }

  const { error } = await supabase.from('ties').insert(data)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function updateTie(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    image_url: formData.get('image_url') as string || null,
    category: formData.get('category') as string,
    color: formData.get('color') as string || null,
    price: parseFloat(formData.get('price') as string),
    stock: parseInt(formData.get('stock') as string),
    active: formData.get('active') === 'true',
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('ties').update(data).eq('id', id)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function deleteTie(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('ties').delete().eq('id', id)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function getTie(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.from('ties').select('*').eq('id', id).single()
  
  if (error) {
    return { error: error.message }
  }
  
  return { data }
}

// ============ CAMISAS ============

export async function createShirt(formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    image_url: formData.get('image_url') as string || null,
    collar_type: formData.get('collar_type') as string,
    color: formData.get('color') as string,
    simple_cuff_price: parseFloat(formData.get('simple_cuff_price') as string),
    simple_cuff_stock: parseInt(formData.get('simple_cuff_stock') as string),
    double_cuff_price: parseFloat(formData.get('double_cuff_price') as string),
    double_cuff_stock: parseInt(formData.get('double_cuff_stock') as string),
    active: formData.get('active') === 'true',
  }

  const { error } = await supabase.from('shirts').insert(data)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function updateShirt(id: string, formData: FormData) {
  const supabase = await createClient()
  
  const data = {
    title: formData.get('title') as string,
    description: formData.get('description') as string || null,
    image_url: formData.get('image_url') as string || null,
    collar_type: formData.get('collar_type') as string,
    color: formData.get('color') as string,
    simple_cuff_price: parseFloat(formData.get('simple_cuff_price') as string),
    simple_cuff_stock: parseInt(formData.get('simple_cuff_stock') as string),
    double_cuff_price: parseFloat(formData.get('double_cuff_price') as string),
    double_cuff_stock: parseInt(formData.get('double_cuff_stock') as string),
    active: formData.get('active') === 'true',
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('shirts').update(data).eq('id', id)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function deleteShirt(id: string) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('shirts').delete().eq('id', id)
  
  if (error) {
    return { error: error.message }
  }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function getShirt(id: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase.from('shirts').select('*').eq('id', id).single()
  
  if (error) {
    return { error: error.message }
  }
  
  return { data }
}
