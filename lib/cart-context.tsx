"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { CartItem } from "./types"

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, cuffType?: string) => void
  updateQuantity: (id: string, quantity: number, cuffType?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "marchiori-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
    setIsHydrated(true)
  }, [])

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      // For shirts, check both id and cuff_type
      const existingIndex = prev.findIndex(item => 
        item.id === newItem.id && 
        (item.type === 'tie' || item.cuff_type === newItem.cuff_type)
      )
      
      if (existingIndex >= 0) {
        const updated = [...prev]
        updated[existingIndex].quantity += newItem.quantity
        return updated
      }
      
      return [...prev, newItem]
    })
  }

  const removeItem = (id: string, cuffType?: string) => {
    setItems(prev => prev.filter(item => {
      if (item.id !== id) return true
      if (cuffType && item.cuff_type !== cuffType) return true
      return false
    }))
  }

  const updateQuantity = (id: string, quantity: number, cuffType?: string) => {
    if (quantity <= 0) {
      removeItem(id, cuffType)
      return
    }
    
    setItems(prev => prev.map(item => {
      if (item.id === id && (!cuffType || item.cuff_type === cuffType)) {
        return { ...item, quantity }
      }
      return item
    }))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
