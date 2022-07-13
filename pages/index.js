import { collection, getDocs, query } from 'firebase/firestore';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';

export default function Home() {
  const router = useRouter();
  const [allpost, setallpost] = useState([]);


  useEffect(() => {
    const q = query(collection(db, "posts"));

    getDocs(q).then((res) => {
      setallpost(res.docs.map((e) => ({ ...e.data(), id: e.id })));
    }
    );
  }, []);

  console.log(allpost)


  return (
    <div className="bg-[#f6f6f6] min-h-screen">
      <div className="h-14 bg-[#121212] px-5 flex items-center justify-between sticky top-0 z-50">
        <Link href="/">
          <a><h1 className="text-xl text-white cursor-pointer">Blog Web App</h1></a>
        </Link>
        <Link href="/createnew">
          <a>
            <button className=' h-10 bg-[#0bcbe5] rounded-full px-8 text-white flex items-center'>Create new post</button>
          </a>
        </Link>
      </div>


      <div className="m-10 grid md:flex md:flex-wrap gap-10 ">

        {allpost.map((post, index) => (
          <div className="bg-white w-full md:w-96 h-[350px] rounded-lg shadow-2xl" key={index}>
            <Image src={post?.thumbnail} width={384} height={216} className="object-cover rounded-t-lg aspect-video" alt="thumbnail" />
            <p className="text-lg px-3 truncate">{post?.title}</p>
            <p className="text-[#444444] text-sm p-3  w-full truncate">{post?.content}</p>
            <button className='mx-auto h-10 bg-[#0b91e5] rounded-full px-8 text-white flex items-center' onClick={() => router.push("/post/" + post?.id)}>View post</button>
          </div>
        ))}

        {allpost.length === 0 ?
          <div className='flex items-center justify-center h-[calc(100vh-107px)]'>
            <p className="text-4xl">No posts available</p>
          </div>
          : null}
      </div>
    </div >
  )
}
