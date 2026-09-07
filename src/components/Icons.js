import React from 'react';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export const HomeIcon = ({ color, size }) => (
  <Ionicons name="home" size={size || 24} color={color} />
);

export const VaultIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="vault" size={size || 24} color={color} />
);

export const TerminalIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="console" size={size || 24} color={color} />
);

export const AIIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="robot" size={size || 24} color={color} />
);

export const DictIcon = ({ color, size }) => (
  <Ionicons name="book" size={size || 24} color={color} />
);
