import ArticleCard from '../components/ArticleCard';
import { useArticles } from '../context/ArticlesContext';

function SavedArticlesPage() {
  const { getUserSavedArticles } = useArticles();
  const articles = getUserSavedArticles();

  return (
    <div>
      <h2 className="page-heading">Saved Articles</h2>

      {articles.length === 0 ? (
        <div className="message">
          No saved articles yet. Browse articles and click the bookmark icon to save them!
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedArticlesPage;