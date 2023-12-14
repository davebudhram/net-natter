import {IAnalystArticle} from "../../interfaces/analystArticle";
import "./analystArticleCard.css";
import {useNavigate} from "react-router-dom";

type AnalystArticleCardProps = {
  article: IAnalystArticle;
};
function AnalystArticleCard(props: AnalystArticleCardProps) {
  const {article} = props;
  const navigate = useNavigate();

  return (
    <div
      className='analyst-article-card'
      onClick={() => navigate(`/analyst-article/${article._id}`)}
    >
      <h3>{article.title}</h3>
      <p>{article.text}</p>
      <p>{article.authorName}</p>
      <p>{new Date(article.date).toLocaleDateString()}</p>
    </div>
  );
}

export default AnalystArticleCard;
