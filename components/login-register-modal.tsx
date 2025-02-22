'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LoginRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginRegisterModal({ isOpen, onClose }: LoginRegisterModalProps) {
  const [isLogin, setIsLogin] = useState(true);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const url = isLogin ? 'http://127.0.0.1:8000/api/login' : 'http://127.0.0.1:8000/api/register';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert(isLogin ? 'Login successful' : 'Registration successful');
      onClose();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.detail}`);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {isLogin ? 'Login' : 'Register'}
                </Dialog.Title>
                <div className="mt-2">
                  {!isLogin && (
                    <>
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
                    </>
                  )}
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
                  {!isLogin && (
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="mb-4"
                      onChange={handleChange}
                    />
                  )}
                </div>

                <div className="mt-4">
                  <Button className="w-full" onClick={handleSubmit}>
                    {isLogin ? 'Login' : 'Register'}
                  </Button>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                    <button
                      className="text-primary font-medium hover:underline"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? 'Register' : 'Login'}
                    </button>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
