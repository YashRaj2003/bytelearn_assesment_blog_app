import React, { useEffect, useState } from 'react'
import { getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'



export default function Post() {
    const router = useRouter();
    const { id } = router.query;
    const [post, setpost] = useState({});
    const [liked, setliked] = useState(false)
    useEffect(() => {
        getDoc(doc(db, "posts/" + id)).then(res =>
            setpost(res.data())
        );
    }, [id])


    async function deletedocument() {
        await deleteDoc(doc(db, "posts", id)).then(() => {
            alert("document deleted  with doc id:" + id);
            router.push("/")
        })
    }

    return (
        <div className="bg-[#f6f6f6] min-h-screen">
            <div className="h-14 bg-[#121212] px-5 flex items-center justify-between sticky top-0 z-50">
                <Link href="/">
                    <a><h1 className="text-xl text-white cursor-pointer">Blog Web App</h1></a>
                </Link>
                <button className=' h-10 bg-[#0bcbe5] rounded-full px-8 text-white flex items-center' onClick={() => router.push("/edit/" + id)}>Edit this post</button>

            </div>
            <div className="m-10 min-h-[420px] bg-white shadow-md rounded p-5 relative overflow-y-auto">
                <button className=' h-10 bg-[#e50b0b] rounded-full px-8 text-white flex items-center absolute right-14' onClick={() => deletedocument()}>Delete this post</button>
                <article>
                    <h1 className="text-2xl text-center pb-6">{post?.title}</h1>
                    <img src={post?.thumbnail} width={384} height={216} className="object-cover rounded-t-lg aspect-video mx-auto" alt="thumbnail" />
                    <p className="text-[#3f3f3f] pt-10">{post?.content}</p>
                </article>
                <div className="mt-10">
                    <button className='' onClick={() => setliked(!liked)}>
                        {liked === false ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                            : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                            </svg>}
                    </button>
                </div>
            </div>
        </div>
    )
}

