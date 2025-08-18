import { 
  MessageCircle, 
  Instagram, 
  Globe, 
  Smartphone,
  Calendar,
  ShoppingCart,
  Headphones,
  BookOpen,
  LucideIcon
} from 'lucide-react'

export interface Channel {
  id: string
  name: string
  icon: LucideIcon
  color: string
  status: 'connected' | 'disconnected'
  messages: number
}

export interface Plugin {
  id: string
  name: string
  icon: LucideIcon
  status: 'active' | 'inactive'
  usage: string
  installs: number
}

export interface Conversation {
  id: number
  user: string
  platform: string
  time: string
  preview: string
  status: 'unread' | 'read' | 'resolved' | 'pending'
}

export interface Workflow {
  id: number
  name: string
  trigger: string
  status: 'active' | 'draft' | 'inactive'
  completions: number
}

export const channels: Channel[] = [
  { 
    id: 'whatsapp', 
    name: 'WhatsApp', 
    icon: MessageCircle, 
    color: 'text-green-500', 
    status: 'connected', 
    messages: 1247 
  },
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: Instagram, 
    color: 'text-pink-500', 
    status: 'connected', 
    messages: 892 
  },
  { 
    id: 'website', 
    name: 'Website Chat', 
    icon: Globe, 
    color: 'text-blue-500', 
    status: 'connected', 
    messages: 634 
  },
  { 
    id: 'mobile', 
    name: 'Mobile App', 
    icon: Smartphone, 
    color: 'text-purple-500', 
    status: 'disconnected', 
    messages: 0 
  }
]

export const plugins: Plugin[] = [
  { 
    id: 'booking', 
    name: 'Booking System', 
    icon: Calendar, 
    status: 'active', 
    usage: '85%', 
    installs: 1234 
  },
  { 
    id: 'orders', 
    name: 'Order Tracking', 
    icon: ShoppingCart, 
    status: 'active', 
    usage: '92%', 
    installs: 987 
  },
  { 
    id: 'support', 
    name: 'Ticket Support', 
    icon: Headphones, 
    status: 'inactive', 
    usage: '0%', 
    installs: 654 
  },
  { 
    id: 'faq', 
    name: 'FAQ Bot', 
    icon: BookOpen, 
    status: 'active', 
    usage: '78%', 
    installs: 2341 
  }
]

export const conversations: Conversation[] = [
  { 
    id: 1, 
    user: 'Sarah Johnson', 
    platform: 'whatsapp', 
    time: '2 min ago', 
    preview: 'Hi, I need help with my booking...', 
    status: 'unread' 
  },
  { 
    id: 2, 
    user: 'Mike Chen', 
    platform: 'instagram', 
    time: '5 min ago', 
    preview: 'Can you help me track my order?', 
    status: 'read' 
  },
  { 
    id: 3, 
    user: 'Emma Davis', 
    platform: 'website', 
    time: '12 min ago', 
    preview: 'What are your business hours?', 
    status: 'resolved' 
  },
  { 
    id: 4, 
    user: 'Alex Rodriguez', 
    platform: 'whatsapp', 
    time: '1 hour ago', 
    preview: 'I want to cancel my subscription', 
    status: 'pending' 
  }
]

export const workflows: Workflow[] = [
  { 
    id: 1, 
    name: 'Hotel Booking Flow', 
    trigger: 'booking inquiry', 
    status: 'active', 
    completions: 156 
  },
  { 
    id: 2, 
    name: 'Order Status Check', 
    trigger: 'track order', 
    status: 'active', 
    completions: 203 
  },
  { 
    id: 3, 
    name: 'FAQ Assistant', 
    trigger: 'help', 
    status: 'active', 
    completions: 89 
  },
  { 
    id: 4, 
    name: 'Lead Generation', 
    trigger: 'pricing', 
    status: 'draft', 
    completions: 0 
  }
]