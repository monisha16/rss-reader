import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FEED_DATA, FEED_LIST, BOOKMARK_DATA } from '../../store/actionTypes';
import styles from './bookmarks.module.scss';
import FeedCard from '../FeedCard/FeedCard';
import EmptyFeeds from '../EmptyFeeds/EmptyFeeds';

const Bookmarks = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        const feedListInSessionStorage = sessionStorage.getItem('FeedList');
        if (feedListInSessionStorage) {
            dispatch({
                type: FEED_LIST,
                payload: JSON.parse(feedListInSessionStorage)
            })
        }

        const feedItemsInSessionStorage = sessionStorage.getItem('FeedData');
        if (feedItemsInSessionStorage) {
            dispatch({
                type: FEED_DATA,
                payload: JSON.parse(feedItemsInSessionStorage)
            })
        }

        const bookmarksInLocalStorage = localStorage.getItem('Bookmarks');
        if (bookmarksInLocalStorage) {
            dispatch({
                type: BOOKMARK_DATA,
                payload: JSON.parse(bookmarksInLocalStorage)
            })
        }

    }, [dispatch]);
    const { bookmarkData } = useSelector((state) => {
        const states = {
            bookmarkData: state.feedReducer.bookmarkData
        }
        return states;
    });
    useEffect(() => {
        localStorage.setItem('Bookmarks', JSON.stringify(bookmarkData));
    }, [bookmarkData])


    return (
        <>
            {
                Object.keys(bookmarkData).length !== 0 ?
                <div className={styles.mainpage}>
                    <div className={styles.mainHeader}>
                        <h1 style={{ fontWeight: 900, fontSize: "2rem" }}>Bookmarks</h1>
                    </div>
                
                    <div className={styles.feedCardContainer}>
                        <FeedCard cardData={bookmarkData} type="bookmark" />
                    </div>
                </div>
            :
                    <div className={styles.emptyfeed} >
                        <EmptyFeeds type="bookmarks" />
                    </div>
            }
        </>
        
    );
};

export default Bookmarks;