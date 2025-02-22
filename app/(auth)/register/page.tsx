'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    date_of_birth: '',
    gender: '',
    mobile_no: '',
    address: ''
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert('Registration successful');
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
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        className="mb-4"
        onChange={handleChange}
      />
      <Input
        type="date"
        name="date_of_birth"
        placeholder="Date of Birth"
        className="mb-4"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="gender"
        placeholder="Gender"
        className="mb-4"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="mobile_no"
        placeholder="Mobile No"
        className="mb-4"
        onChange={handleChange}
      />
      <Input
        type="text"
        name="address"
        placeholder="Address"
        className="mb-4"
        onChange={handleChange}
      />
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
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        className="mb-4"
        onChange={handleChange}
      />
      <Button className="w-full" onClick={handleSubmit}>
        Register
      </Button>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Already have an account?{' '}
          <button
            className="text-primary font-medium hover:underline"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
