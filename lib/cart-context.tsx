"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Tie, Shirt, CartItem } from "./products"

type CartContextType = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (itemKey: string) => void
  updateQuantity: (itemKey: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  getItemKey: (item: CartItem) => string
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "marchiori-cart"

// Gera uma chave única para cada item do carrinho
function getItemKey(item: CartItem): string {
  if (item.type === 'tie') {
    return `tie-${item.product.id}`
  } else {
    return `shirt-${item.product.id}-${item.cuffType}`
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!isMounted) return
    
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
    setIsHydrated(true)
  }, [isMounted])

  // Save cart to localStorage on changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addItem = (newItem: CartItem) => {
    const newItemKey = getItemKey(newItem)
    
    setItems(prev => {
      const existingIndex = prev.findIndex(item => getItemKey(item) === newItemKey)
      
      if (existingIndex >= 0) {
        // Atualiza quantidade do item existente
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      }
      
      // Adiciona novo item
      return [...prev, newItem]
    })
  }

  const removeItem = (itemKey: string) => {
    setItems(prev => prev.filter(item => getItemKey(item) !== itemKey))
  }

  const updateQuantity = (itemKey: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemKey)
      return
    }
    setItems(prev =>
      prev.map(item =>
        getItemKey(item) === itemKey ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, getItemKey }}
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
