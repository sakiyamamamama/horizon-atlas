import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
// import { getAllData, getSinglePage } from "../dataAccess/notionApiGateway";
import { PostMetaData } from "@/types/postMetaData";
// import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { MdBlock } from "notion-to-md/build/types";

// export const getAllPosts =async()=>{
//     const allData = await getAllData();
//     return allData.map((data)=>{
//         return getPageMetaData(data);
//     })
// }

// export const getSinglePost=async(slug:string)=>{
//     const {page,mdBlocks} = await getSinglePage(slug);
//     const metadata:PostMetaData = getPageMetaData(page);

//     return {
//         metadata,
//         mdBlocks
//     }
// }

// const getPageMetaData = (post: PageObjectResponse):PostMetaData => {

//     const getTags = (tags:Array<object>)=>{
//         const allTags = tags.map((tag)=>{
//             return 'name' in tag && typeof tag.name == 'string' ? tag.name : '';
//         });
//         return allTags;
//     }
//     const properties = post.properties;
//     const date:string =  'date' in properties.date && 'start' in properties.date.date! && typeof properties.date.date.start == 'string' ?properties.date.date.start :'';
//     const icon:string = 'icon' in properties && 'files' in properties.icon && typeof properties.icon.files[0] === 'object' && 'file' in properties.icon.files[0] ? properties.icon.files[0].file.url : '';

//     return {
//         id: post.id,
//         title:'title' in properties.title ? properties.title.title[0].plain_text : 'untitled',
//         date: date,
//         tags: 'multi_select' in properties.tag ? getTags(properties.tag.multi_select) : [],
//         slug:'rich_text' in properties.slug ? properties.slug.rich_text[0].plain_text : 'untitled',
//         category:'select' in properties.category && properties.category.select ? properties.category.select.name : '',
//         is_basic_curriculum:'checkbox' in properties.is_basic_curriculum ? properties.is_basic_curriculum.checkbox : false,
//         icon: icon
//     };
// };

// ページ番号に応じた記事取得
export const getPostsByPage=async(page:number,allPosts:PostMetaData[])=>{

    const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;

    const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
    
    return allPosts.slice(startIndex, endIndex);
};

const calculatePageNumber = (posts:PostMetaData[]) => {
    const pageNumber = 
        (posts.length % NUMBER_OF_POSTS_PER_PAGE) != 0 ?
        Math.trunc(posts.length / NUMBER_OF_POSTS_PER_PAGE) + 1 :
        Math.trunc(posts.length / NUMBER_OF_POSTS_PER_PAGE);

    return pageNumber;
}

export const getPostsByTag=async(tagName:string, allPosts:PostMetaData[])=>{
    const posts:PostMetaData[] = allPosts.filter((post)=> {
        return post.tags.find((tag:string)=>tag.toLowerCase()==tagName.toLowerCase())
    });
    return posts;
}

export const getNumberOfPages=async(allPosts:PostMetaData[],tagName?:string, course?:string)=>{
    if(tagName!==undefined){
        const posts = await getPostsByTag(tagName,allPosts);
        return calculatePageNumber(posts);
    }else if(course!==undefined){
        const posts = await getPostsByCourse(course,allPosts);
        return calculatePageNumber(posts);
    }else{
        return calculatePageNumber(allPosts);
    }
};

export const getPostsByTagAndPage=async(tagName:string, page:number,allPosts:PostMetaData[])=>{
    const posts:PostMetaData[] = await getPostsByTag(tagName,allPosts);

    const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
    const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
    
    return posts.slice(startIndex, endIndex);
}

export const getAllTags = async(allPosts:PostMetaData[])=>{
    
    const allTagsDuplicationList = allPosts.flatMap((post)=>{
        return post.tags;
    })
    const set = new Set(allTagsDuplicationList);
    const allTags = Array.from(set);

    return allTags;
}

export const getIconsByPosts=(posts:PostMetaData[])=>{
    const iconsDuplicationList = posts.map((post)=>{
        return post.icon;
    })
    const set = new Set(iconsDuplicationList);
    const icons = Array.from(set);

    return icons;
}

export const getClassifyPost=async(allPosts:PostMetaData[])=>{

    const basic = allPosts.filter((post)=>post.is_basic_curriculum);
    const notBasic = allPosts.filter((post)=>!post.is_basic_curriculum);

    return {
        basic,
        notBasic
    } 
}

export const getPostsByCourse=async(course:string,allPosts:PostMetaData[])=>{
    const postByCourse = allPosts.filter((post)=>post.category===course);
    return postByCourse;
}

export const getAllCourses = async(allPosts:PostMetaData[])=>{
    const allCoursesDuplication = allPosts.map((post)=>{
        return post.category;
    })
    const set = new Set(allCoursesDuplication);
    const allCourses = Array.from(set);
    return allCourses;
}

export const getEitherCourses = async(isBasic:boolean,allPosts:PostMetaData[])=>{
    const classifiedPost = await getClassifyPost(allPosts);
    const post = isBasic ? classifiedPost.basic : classifiedPost.notBasic;
    const allCoursesDuplication = post.map((post)=>{
        return post.category;
    })
    const set = new Set(allCoursesDuplication);
    const allCourses = Array.from(set);
    return allCourses;
}

export const getPostsByCourseAndPage=async(course:string, page:number, allPosts:PostMetaData[])=>{
    const posts:PostMetaData[] = await getPostsByCourse(course,allPosts);

    const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
    const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
    
    return posts.slice(startIndex, endIndex);
}

export const courseIsBasic=async(course:string,allPosts:PostMetaData[])=>{
    const posts:PostMetaData[] = await getPostsByCourse(course,allPosts);
    const filteredPost = posts.filter((post)=>post.is_basic_curriculum)
    if(filteredPost.length===0){
        return false;
    }
    return true;
}

export const getChildPage=(mdBlocks:MdBlock[])=>{
    const childPages = mdBlocks.filter((block)=>block.type==='child_page');
    return childPages;
}