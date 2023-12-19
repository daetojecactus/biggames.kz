//Анимация картинки
const AnswerImageAnimation = {
    hidden: {
        scale: 0.3,
        opacity: 0,
        x: 100,
        y: 100
      },
      visible: {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.5 },
      },
};

export default AnswerImageAnimation;