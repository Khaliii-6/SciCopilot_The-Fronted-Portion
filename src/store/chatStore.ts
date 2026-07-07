import { create } from 'zustand';
import type { Message, Conversation } from '@/types';

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isStreaming: boolean;
  streamingContent: string;

  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, messageId: string, updates: Partial<Message>) => void;
  setStreaming: (isStreaming: boolean) => void;
  appendStreamingContent: (content: string) => void;
  clearStreamingContent: () => void;
  deleteConversation: (conversationId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  currentConversation: null,
  isStreaming: false,
  streamingContent: '',

  setConversations: (conversations) => set({ conversations }),

  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      currentConversation: conversation,
    })),

  setCurrentConversation: (conversation) => set({ currentConversation: conversation }),

  addMessage: (conversationId, message) =>
    set((state) => {
      const updatedConversations = state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, message], updated_at: new Date().toISOString() }
          : conv
      );
      const updatedCurrent =
        state.currentConversation?.id === conversationId
          ? {
              ...state.currentConversation,
              messages: [...state.currentConversation.messages, message],
              updated_at: new Date().toISOString(),
            }
          : state.currentConversation;
      return { conversations: updatedConversations, currentConversation: updatedCurrent };
    }),

  updateMessage: (conversationId, messageId, updates) =>
    set((state) => {
      const updatedConversations = state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: conv.messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg
              ),
            }
          : conv
      );
      const updatedCurrent =
        state.currentConversation?.id === conversationId
          ? {
              ...state.currentConversation,
              messages: state.currentConversation.messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg
              ),
            }
          : state.currentConversation;
      return { conversations: updatedConversations, currentConversation: updatedCurrent };
    }),

  setStreaming: (isStreaming) => set({ isStreaming }),

  appendStreamingContent: (content) =>
    set((state) => ({ streamingContent: state.streamingContent + content })),

  clearStreamingContent: () => set({ streamingContent: '' }),

  deleteConversation: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.filter((c) => c.id !== conversationId),
      currentConversation:
        state.currentConversation?.id === conversationId ? null : state.currentConversation,
    })),
}));
