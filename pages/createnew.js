import React, { useRef } from 'react'
import Link from 'next/link'
import { collection, addDoc, setDoc, doc, } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useRouter } from 'next/router'

export default function Createnew() {

    const router = useRouter();


    let title = useRef();
    let content = useRef();
    let thumbnail = useRef();

    async function submit() {
        var post_details = {
            title: title.current.value,
            content: content.current.value,
            thumbnail: thumbnail.current.value,
        }
        if (!post_details.title) {
            return alert("add title of post")
        }
        if (!post_details.content) {
            return alert("add content of post")
        }
        if (!post_details.thumbnail) {
            return alert("add thumbnail of post")
        }
        console.log(post_details)
        // await setDoc(doc(db, "posts", "sdghfkusd"), post_details).then(() => {
        //     alert("document added with id:" + "sdghfkusd");
        //     window.location.reload(false);
        // });

        await addDoc(collection(db, "posts"), post_details).then((doc) => {
            alert("document added with id:" + doc.id);
            router.push("/post/" + doc.id)
        }).catch((err) => {
            alert(err.message);

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
                <h2 className="text-center text-xl font-semibold">Create a post</h2>
                <hp className="text-center">*please add only unsplash image url</hp>
            </div>
            <div className="w-96 space-y-5 mx-auto">
                <input type="text" placeholder='title of post' className="w-full px-3 h-12 border border-transparent focus:border-purple-500 outline-none " ref={title} />
                <textarea placeholder='write post content here' className="h-24 w-full p-3 border border-transparent focus:border-purple-500 outline-none " ref={content}></textarea>
                <input type="text" placeholder='thumbnail url' className="w-full px-3 h-12 border border-transparent focus:border-purple-500 outline-none " ref={thumbnail} />
                <button className='mx-auto h-12 bg-[#121212] rounded-full px-10 text-white flex items-center' onClick={() => submit()}>Create post</button>
            </div>

        </div>
    )
}

