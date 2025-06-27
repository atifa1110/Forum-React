import { React, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/use-auth';
import { useThreads } from '../hooks/use-threads';
import PostList from '../component/PostList';
import CategoryList from '../component/CategoryList';
import useLeaderboard from '../hooks/use-leaderboard';
import LeaderboardHomeItem from '../component/LeaderboardItemHome';
import useCategory from '../hooks/use-category';
import AddThreadItem from '../component/AddThreadItem';
import { ClipLoader } from 'react-spinners';
import { useSearch } from '../hooks/use-seach';

export default function HomePage() {
  const { user } = useAuth();
  const { leaderboard } = useLeaderboard();
  const [showModal, setShowModal] = useState(false);

  const [sortBy, setSortBy] = useState('latest');
  const { setSearchValue } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedCategories, allCategories,
    handleCategoryChange, handleClear } = useCategory();

  const handleClearAll = () => {
    handleClear();  // clear selected categories
    setSearchValue('');
    // Remove search param from URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const { filteredThreads, isLoadData } = useThreads(searchParams, selectedCategories, sortBy);

  if (isLoadData) {
    return (
      <div className="centered-spinner">
        <ClipLoader size={50} color="#333" loading={true} />
      </div>
    );
  }
  return (
    <div className="home-page">
      <CategoryList
        categories={allCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        onClear={handleClearAll}/>

      <section className="discussions">
        <div className="discussions-header">
          <h2>Popular Discussions</h2>
          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortBy} onChange={(e)=> setSortBy(e.target.value)}>
              {/* Sort threads by most upvotes (Trending) */}
              <option value="trending">Trending</option>
              {/* Sort threads by most recent (Latest) */}
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>

        <PostList threads={filteredThreads} isLoading={isLoadData}/>

        <div className="create-discussion-wrapper">
          {user ? (
            <>
              <button className="create-discussion-button" onClick={() => setShowModal(true)}>
                + Create New Discussion
              </button>
              <AddThreadItem isOpen={showModal} onClose={() => setShowModal(false)} />
            </>
          ) : null}
        </div>
      </section>

      <aside className="widgets">
        <div className="leaderboard">
          <h3>Leaderboard</h3>
          {leaderboard.slice(0, 3).map((leaderboard, index) => (
            <LeaderboardHomeItem key={leaderboard.user.id} leaderboard={leaderboard} index={index}/>
          ))}
          <a href="/leaderboard">View Full LeaderBoard</a>
        </div>
      </aside>
    </div>
  );
}