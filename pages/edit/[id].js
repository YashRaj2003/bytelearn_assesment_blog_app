import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { collection, addDoc, setDoc, doc, updateDoc, getDoc, } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useRouter } from 'next/router'

function createnew() {

    const router = useRouter();
    const { id } = router.query;
    const [post, setpost] = useState({});


    let title = useRef();
    let content = useRef();
    let thumbnail = useRef();

    useEffect(() => {
        getDoc(doc(db, "posts/" + id)).then(res =>
            setpost(res.data())
        );
    }, [id])

    async function updatepost() {
        var documentdetails = {
            title: title.current.value,
            content: content.current.value,
            thumbnail: thumbnail.current.value,
        }
        await updateDoc(doc(db, "posts", id), documentdetails).then(() => {
            alert("document update  with doc id:" + id);
            router.push("/post/" + id)
        });


    }
    return (
        <div className="bg-[#f6f6f6] min-h-screen">
            <div className="h-14 bg-[#121212] px-5 flex items-center justify-between">
                <Link href="/">
                    <a><h1 className="text-xl text-white cursor-pointer">Blog Web App</h1></a>
                </Link>


            </div>
            <div className="my-16">
                <h2 className="text-center text-xl font-semibold">Update this post</h2>
            </div>
            <div className="w-96 space-y-5 mx-auto">
                <input type="text" placeholder='title of post' className="w-full px-3 h-12 border border-transparent focus:border-purple-500 outline-none " defaultValue={post?.title} ref={title} />
                <textarea placeholder='write post content here' className="h-24 w-full p-3 border border-transparent focus:border-purple-500 outline-none " defaultValue={post?.content} ref={content}></textarea>
                <input type="text" placeholder='thumbnail url' className="w-full px-3 h-12 border border-transparent focus:border-purple-500 outline-none " defaultValue={post?.thumbnail} ref={thumbnail} />
                <button className='mx-auto h-12 bg-[#121212] rounded-full px-10 text-white flex items-center' onClick={() => updatepost()}>Update post</button>
            </div>

        </div>
    )
}

export default createnew