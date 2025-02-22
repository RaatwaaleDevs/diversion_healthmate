'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Login successful');
      router.push('/dashboard');
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="sm"
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        className="mb-4"
        onChange={handleChange}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        className="mb-4"
        onChange={handleChange}
      />
      <Button className="w-full" onClick={handleSubmit}>
        Login
      </Button>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => router.push('/register')}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
