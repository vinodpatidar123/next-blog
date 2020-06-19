import Head from 'next/head'
import Link from "next/link"
import Date from '../components/date'
import utilStyles from "../styles/utils.module.css"
import fetch from "node-fetch";
import Layout, {siteTitle} from '../components/layout'

export const getStaticProps = async()=> {
  const res = await fetch("http://localhost:3001/posts");
  const allPostsData =  await res.json();
  return {
    props: {
      allPostsData
    }
  }
}



export default function Home({allPostsData}) {
  return (
    <Layout home>
    <Head>
    <title>{siteTitle}</title>
  </Head>
  <section className={utilStyles.headingMd}>
    <p style={{textAlign : "center"}}>I'm Vinod Patidar, Developer, Designer and Engineer.</p>
  </section>
  <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2 className={utilStyles.headingLg}>Blog</h2>
    <div className={utilStyles.container}>
      {/* <ul className={utilStyles.list}> */}
      {allPostsData.map(({ id, date, title }) => (
        <div className={utilStyles.col}>
        <li className={utilStyles.listItem} key={id}>
        <Link href="/posts/[id]" as={`/posts/${id}`}>
          <a>{title}</a>
        </Link>
        <br />
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
      </li>
        </div>
      ))}
    {/* </ul> */}
    </div>
  </section>
  <button style={{
    padding : "10px",
    backgroundColor : ""
  }} >Add Blog</button>
</Layout>
  )
}