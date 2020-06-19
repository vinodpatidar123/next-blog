import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../libs/posts'
import fetch from "node-fetch";
import Head from "next/head"
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
  
export default function Post({postData}) {
  return (
  <Layout>
       <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div>
          <p>
            {postData.content}
          </p>
        </div>
      </article>
  </Layout>
  )
}

export async function getStaticPaths() {
    const res = await fetch(`http://localhost:3001/posts`);
    const data = await res.json()
    let paths = data.map(p =>{
      return {
        params :{
          id : p.id
        }
      }
    })
    return {
      paths,
      fallback: false
    }
  }
  export async function getStaticProps({ params }) {
    const res = await fetch(`http://localhost:3001/course/course/${params.id}`);
    const postData = await res.json();
    console.log(postData);
    return {
      props: {
        postData
      }
    }
  }