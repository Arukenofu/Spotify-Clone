import type { Component } from 'vue'

export interface BaseItemProps {
  as?: Component | string
  underline?: boolean
  active?: 'active' | 'active-icon' | 'active-additional' | false
}
