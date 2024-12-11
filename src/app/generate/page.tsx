'use client'

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { contentType } from '@/utils/contentType';
import { Clock, Instagram, Linkedin, Twitter, Zap } from 'lucide-react';

import React, { useState } from 'react'

export default function GeneratePage() {
    const [history, setHistory] = useState([])
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedContentType, setSelectedContentType] = useState<string>('')


    return (
        <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen text-white">
            <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 mt-14 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 bg-gray-800 rounded-2xl p-6 h-[calc(100vh-12rem)] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-blue-400">History</h2>
                            <Clock className="h-6 w-6 text-blue-400" />
                        </div>
                        <div className="space-y-4">
                            {history.map((item: any) => (
                                <div
                                    key={item}
                                    className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center mb-2">
                                        {item.contentType === "twitter" && (
                                            <Twitter className="mr-2 h-5 w-5 text-blue-400" />
                                        )}
                                        {item.contentType === "instagram" && (
                                            <Instagram className="mr-2 h-5 w-5 text-pink-400" />
                                        )}
                                        {item.contentType === "linkedin" && (
                                            <Linkedin className="mr-2 h-5 w-5 text-blue-600" />
                                        )}
                                        <span className="text-sm font-medium">
                                            {item.contentType}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300 truncate">
                                        {item.prompt}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-400 mt-2">
                                        <Clock className="mr-1 h-3 w-3" />
                                        {new Date(item.createdAt).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-gray-800 p-6 rounded-2xl space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Content Type
                                </label>
                                <Select onValueChange={(e) => setSelectedContentType(e.toLocaleLowerCase())}
                                >
                                    <SelectTrigger className="w-full bg-gray-700 border-none rounded-xl">
                                        <SelectValue placeholder="Select content type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {contentType.map(({ label, icon }) => (
                                            <SelectItem key={label} value={label}>
                                                <div className="flex items-center gap-10 cursor-pointer">

                                                    {icon}
                                                    {label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <label
                                    htmlFor="prompt"
                                    className="block text-sm font-medium mb-2 text-gray-300"
                                >
                                    Prompt
                                </label>
                                <Textarea
                                    id="prompt"
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Enter your prompt here"
                                    rows={4}
                                    className="w-full bg-gray-700 border-none rounded-xl resize-none"
                                />
                            </div>
                            <Button className='w-full' disabled={!selectedContentType}>Generate Content</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
