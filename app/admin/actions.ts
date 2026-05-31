"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Gravatas
export async function createTie(data: {
  title: string
  description?: string
  image_url?: string
  price: number
  stock: number
  category: string
  color?: string
  active: boolean
}) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('ties').insert({
    ...data,
    updated_at: new Date().toISOString()
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function updateTie(id: string, data: {
  title: string
  description?: string
  image_url?: string
  price: number
  stock: number
  category: string
  color?: string
  active: boolean
}) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('ties').update({
    ...data,
    updated_at: new Date().toISOString()
  }).eq('id', id)

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

// Camisas
export async function createShirt(data: {
  title: string
  description?: string
  image_url?: string
  collar_type: string
  color: string
  simple_cuff_price: number
  simple_cuff_stock: number
  double_cuff_price: number
  double_cuff_stock: number
  active: boolean
}) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('shirts').insert({
    ...data,
    updated_at: new Date().toISOString()
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function updateShirt(id: string, data: {
  title: string
  description?: string
  image_url?: string
  collar_type: string
  color: string
  simple_cuff_price: number
  simple_cuff_stock: number
  double_cuff_price: number
  double_cuff_stock: number
  active: boolean
}) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('shirts').update({
    ...data,
    updated_at: new Date().toISOString()
  }).eq('id', id)

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

export async function getTie(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('ties').select('*').eq('id', id).single()
  
  if (error) {
    return { error: error.message }
  }
  
  return { data }
}

export async function getShirt(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('shirts').select('*').eq('id', id).single()
  
  if (error) {
    return { error: error.message }
  }
  
  return { data }
}
