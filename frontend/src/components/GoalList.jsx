import GoalItem from "./GoalItem";

function GoalList({ goals }) {
  return (
    <>
      {goals.map((goal) => (
        <GoalItem key={goal._id} goal={goal} />
      ))}
    </>
  );
}

export default GoalList;
