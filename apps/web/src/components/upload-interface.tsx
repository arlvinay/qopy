"use client"

import React from 'react'
import { FileUpload } from '@/components/file-upload'
import { CartList } from '@/components/cart-list'
import Link from 'next/link'
import Image from "next/image"

interface UploadInterfaceProps {
    headline?: string;
    subtext?: string;
    printerLocation?: string;
    printerStatus?: 'online' | 'offline';
    pagesLeft?: number;
}

export function UploadInterface({
    headline = "Upload Documents",
    subtext = "Select files to print. We support PDF, DOCX, and Images.",
    printerLocation,
    printerStatus,
    pagesLeft
}: UploadInterfaceProps) {
    return (
        <div className="min-h-screen bg-zinc-50 font-sans">
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative h-14 w-40">
                                <Image
                                    src="/logo.png"
                                    alt="Qopy"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {printerLocation && (
                            <div className="hidden md:flex items-center gap-6 mr-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Location</span>
                                    <span className="text-sm font-bold text-zinc-900">{printerLocation}</span>
                                </div>
                                <div className="h-8 w-px bg-zinc-200" />
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`h-2 w-2 rounded-full ${printerStatus === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        <span className={`text-sm font-bold ${printerStatus === 'online' ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {printerStatus === 'online' ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-zinc-200" />
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Pages Left</span>
                                    <span className="text-sm font-bold text-zinc-900">{pagesLeft}</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 md:px-6 py-8 pb-32 lg:pb-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900">{headline}</h1>
                            <p className="text-zinc-500">{subtext}</p>
                        </div>
                        <FileUpload />
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-bold text-zinc-900">Print Queue</h2>
                            <p className="text-zinc-500">Review your files before payment.</p>
                        </div>
                        <CartList />
                    </div>
                </div>
            </main>
        </div>
    )
}
