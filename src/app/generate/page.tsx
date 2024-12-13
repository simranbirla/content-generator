'use client'

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { contentType } from '@/utils/contentType';
import { generatedPromptPrefix } from '@/utils/prompts';
import { GoogleGenerativeAI } from '@google/generative-ai'
import ReactMarkdown from 'react-markdown'
import { Check, Clipboard, Clock, Instagram, Linkedin, Loader, Twitter, Upload } from 'lucide-react';

import React, { useContext, useEffect, useState } from 'react'
import { createPosts, getPostsByUserId } from '@/db/actions';
import { UserContext } from '@/context/UserContext';
import { ContentType, TPost } from '@/types/posts';

export default function GeneratePage() {
    const { user } = useContext(UserContext);
    const [history, setHistory] = useState<TPost[]>([])
    const [prompt, setPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedContentType, setSelectedContentType] = useState<string>('')
    const [generatedContent, setGeneratedContent] = useState<string>('');
    const [isCopy, setIsCopy] = useState<boolean>(false);

    useEffect(() => {
        const getUsersHistory = async (userId: number) => {
            try {
                const posts = await getPostsByUserId(userId);

                setHistory(posts as TPost[])
            } catch (e) {
                console.log("Error getting posts", e)
            }
        }

        if (user && user.id) {
            getUsersHistory(user.id)
        }
    }, [user])

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const createdPrompt = generatedPromptPrefix(selectedContentType, prompt)
            const result = await model.generateContent(createdPrompt);
            const resultTexts = result.response.text()
            setGeneratedContent(resultTexts)

            await createPosts({
                text: resultTexts,
                userId: user?.id as number,
                contentType: selectedContentType.toLocaleLowerCase() as ContentType
            })

        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }

    }


    const handleCopyToClipboard = () => {
        setIsCopy(true)
        navigator.clipboard.writeText(generatedContent);

        setTimeout(() => {
            setIsCopy(false)
        }, 1000)
    }



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
                            {history.map((item) => (
                                <div
                                    key={item.id}
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
                                        {item.text}
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

                            {selectedContentType === 'instagram' && <div className="mb-4">
                                <label htmlFor="verification-image" className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Image
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="verification-image"
                                                className="relative cursor-pointer text-center rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                            >
                                                <span className='text-center mx-auto'>Upload a file</span>
                                                <input id="verification-image" name="verification-image" type="file" className="sr-only" accept="image/*" />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>}

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
                            <Button className='w-full' disabled={!selectedContentType || loading} onClick={handleGenerate}>
                                Generate Content
                                {loading ? <Loader className="animate-spin h-8 w-8 text-gray-500" /> : ''}</Button>
                            {generatedContent ? <div >
                                <h2 className='text-lg pb-3'>Generated Content:</h2>
                                <div className='bg-gray-600 p-6 rounded-2xl space-y-6 text-ellipsis flex flex-col gap-3'>
                                    <Button onClick={handleCopyToClipboard} className={`gap-1 text-sm cursor-pointer w-auto self-end ${isCopy ? 'border-solid border-2 border-white' : ''}`} variant={'ghost'}>{!isCopy ? 'Copy to Clipboard' : 'Copied!'} {!isCopy ? <Clipboard className='h-4 w-4' /> : <Check className='h-4 w-4' />}</Button>
                                    <ReactMarkdown>
                                        {generatedContent}
                                    </ReactMarkdown>
                                </div>

                            </div> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
