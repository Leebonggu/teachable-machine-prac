import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(16, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [
  {
    title: '이미지 분류',
    description: '파일 또는 웹캠을 사용해 이미지를 분류하는 방법을 모델에 학습시켜 사용합니다.',
    url: '/image-classfication',
  },
  {
    title: '음성 분류',
    description: '짧은 사운드 샘플을 녹음하여 오디오를 분류하도록 모델을 학습시켜 사용합니다.',
    url: '/sound-classfication',
  },
  {
    title: '자세 분류',
    description: '파일을 사용하거나 웹캠에서 자세를 취하여 몸의 자세를 분류하도록 모델을 학습시켜 사용합니다.',
    url: '/pose-classfication',
  }
];

function Main() {
  const classes = useStyles();
  return (
    <main>
      <ThemeProvider>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Machine Learning Application
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              만들어진 AI를 사용하는 것은 그렇게 어렵지 않습니다. Teachable Machine을 통헤 만들어진 머신러닝 모델을 적용시켜보세요.
            </Typography>
          </Container>
        </div>
      </ThemeProvider>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card, index) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
                <Link to={card.url} style={{ textDecoration: 'none' }}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={`https://source.unsplash.com/random/${index}`}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link to={card.url} style={{ textDecoration: 'none' }}>
                      <Button size="small" color="primary">
                        이동
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
            </Link>
              </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}

export default Main;