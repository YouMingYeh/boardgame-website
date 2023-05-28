import React from 'react';
import { Typography, Container, Grid, Paper, Divider, Button } from '@mui/material';

const AboutPage = () => {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Container maxWidth="md">
        <Paper style={{ padding: '1.5rem' }} elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <img
                src={imageUrl}
                alt="No9 Space"
                style={{ width: '100%', maxWidth: 400, marginBottom: '1rem' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h1" gutterBottom>
                No9聚會空間 @公館
              </Typography>
              <Typography variant="body1" gutterBottom>
                提供溫馨舒適的場地、桌遊教學、活動聚會包場、現沖茶飲、投影設備。另有三間包廂供私密聚會。歡迎洽詢：）
              </Typography>
              <Divider />
              <Typography variant="body1" gutterBottom>
                營業時間：<br />
                平日 14:00-22:30<br />
                週末及國定假日 10:30-22:30
              </Typography>
              <Divider />
              <Typography variant="body1" gutterBottom>
                消費方式：<br />
                平日 1小時 50元/人，<br />
                超過 3小時以包日價格 200元/人計算，<br />
                包日價贈送每人50元以下飲品。
              </Typography>
              <Divider />
              <Typography variant="body1" gutterBottom>
                假日分為 10:30-16:30 及 16:30-22:30 兩個時段，<br />
                每個時段入場費 200元/人，超過 16:30 視為跨時段；<br />
                包日價格 300元/人。<br />
                假日消費皆贈送每人一份 50元以下飲品。
              </Typography>
              <Divider />
              <Typography variant="body1" gutterBottom>
                店內提供投影、音響設備，<br />
                有活動場地或包場需求也歡迎預約使用。
              </Typography>
              <Typography variant="body1" gutterBottom>
                遊戲清單請參考：<br />
                <a href="http://0rz.tw/uv8Gn" target="_blank" rel="noopener noreferrer">
                  http://0rz.tw/uv8Gn
                </a>
              </Typography>
              <Typography variant="body1">
                歡迎喜歡桌遊的舊雨新知們再一起來過來玩哦～
              </Typography>
              <Button size='large' variant='contained'><div>沒朋友？看看媒合平台！</div></Button>
            </Grid>
          </Grid>
        </Paper>
     </Container>
    </div>
  )
}

export default AboutPage


const imageUrl = "https://scontent.ftpe15-1.fna.fbcdn.net/v/t1.18169-9/16195337_962002420567315_5143547643019597625_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=9267fe&_nc_ohc=6j80VxnFOg4AX-9K2-k&_nc_ht=scontent.ftpe15-1.fna&oh=00_AfBsbizFOmloI3nJ__iCWQORqplq6tknHGAC6DikoS1C7w&oe=64902789"