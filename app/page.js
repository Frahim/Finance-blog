

import PostSlider from '../components/Homesection/postslider';
import Cta from '../components/Homesection/contact-cta';
import LatestPost from '../components/Homesection/latestpost';
import Categories from '../components/Homesection/popularCategories';

import PostsByCategory from '../components/Homesection/PostsByCategory';


export default async function Home() {
  return (
    <>
      <div>
        <PostSlider />
        <Cta />
        <LatestPost />
        <Categories/>        
        <PostsByCategory categoryName="Saving & Loan" style="styleA" />        
        <PostsByCategory categoryName="Mutual Funds" style="styleB" />
        <PostsByCategory categoryName="Wealth Management" style="default" />
        <PostsByCategory categoryName="Banking" style="styleC" />
        <PostsByCategory categoryName="Insurance" style="styleD" />      
      </div>
    </>
  )
}
