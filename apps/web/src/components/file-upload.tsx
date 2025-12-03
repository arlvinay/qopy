"use client"

import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File as FileIcon, X, AlertCircle } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { cn } from '@/lib/utils'

export function FileUpload() {
    const { addFiles } = useCart()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        addFiles(acceptedFiles)
    }, [addFiles])

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        maxSize: 50 * 1024 * 1024, // 50MB
        accept: {
            'application/pdf': ['.pdf'],
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        }
    })

    return (
        <div className="w-full space-y-4">
            <div
                {...getRootProps()}
                className={cn(
                    "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 ease-in-out bg-zinc-50/50 hover:bg-zinc-50",
                    isDragActive ? "border-emerald-500 bg-emerald-50/50" : "border-zinc-200",
                    fileRejections.length > 0 && "border-red-500 bg-red-50/50"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    <div className={cn(
                        "p-4 rounded-full mb-4 transition-colors",
                        isDragActive ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-400"
                    )}>
                        <Upload className="w-8 h-8" />
                    </div>
                    {isDragActive ? (
                        <p className="text-lg font-medium text-emerald-600">Drop files here...</p>
                    ) : (
                        <>
                            <p className="mb-2 text-lg font-medium text-zinc-700">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-zinc-500">
                                PDF, DOCX, JPG or PNG (MAX. 50MB)
                            </p>
                        </>
                    )}
                </div>
            </div>

            {fileRejections.length > 0 && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <p>Some files were rejected. Please check size (max 50MB) and format.</p>
                </div>
            )}
        </div>
    )
}
