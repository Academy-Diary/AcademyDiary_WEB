import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from '../../../components';
import { useUserAuthStore } from '../../../store';
import { useDeleteExam } from '../../../api/queries/test/useDeleteExam';
import { useAttendeeList } from '../../../api/queries/lectures/useAttendeeList';
import { useScoreAdd, useScoreEdit, useScoreList } from '../../../api/queries/test/useScore';

export default function ScoreList() {
  const { courseid, testid } = useParams();
  const navigate = useNavigate();
  const { lectures } = useUserAuthStore();

  const [isEditing, setEditing] = useState({});

  const { data: attendees } = useAttendeeList(courseid); // 강의 수강생 목록
  const { data: scores, refetch: refetchScore } = useScoreList(courseid, testid); // 시험에 대한 점수 목록
  const useEdit = useScoreEdit(courseid, testid);
  const useAdd = useScoreAdd(courseid, testid);

  const deleteExam = useDeleteExam(courseid);

  const handleEdit = (id, aaa) => {
    if (isEditing[id]) {
      // 수정완료 버튼 눌렀을 때
      const score = scores.scoreList.filter((n) => n.user_id === id);
      console.log('score', score);
      const vscore = document.getElementsByName(id)[0].value;
      if (score.length !== 0) {
        useEdit.mutate(
          {
            user_id: id,
            score: Number(vscore),
          },
          {
            onSuccess: () => {
              refetchScore();
              setEditing({ ...isEditing, [`${id}`]: !isEditing[id] });
            },
          }
        );
      } else {
        useAdd.mutate(
          {
            scoreList: [
              {
                user_id: id,
                score: Number(vscore),
              },
            ],
          },
          {
            onSuccess: () => {
              refetchScore();
              setEditing({ ...isEditing, [`${id}`]: !isEditing[id] });
            },
          }
        );
      }
    } else {
      setEditing({ ...isEditing, [`${id}`]: !isEditing[id] });
    }
  };

  const handleDelete = () => {
    deleteExam.mutate(testid, { onSuccess: () => navigate(`/teacher/class/${courseid}/test`) });
  };

  const courseID = Number(courseid);
  const lecture = lectures.filter((n) => n.lecture_id === courseID)[0];

  useEffect(() => {
    if (attendees) {
      for (let i = 0; i < attendees.length; i += 1) {
        const id = attendees[i].user_id;
        setEditing((prev) => ({ ...prev, [`${id}`]: false }));
      }
    }
  }, [attendees]);

  console.log('isEditing', isEditing);

  return (
    <Grid container spacing={2} sx={{ width: '80vw' }}>
      <Grid xs={12}>
        <Title title={lecture.lecture_name} />
      </Grid>
      <Grid xs={8}>
        <Typography fullWidth variant="h6">
          문제수 : 20, 총점 : 100, 평균: 70, 표준오차 : 35, 수강인원 : {lecture.headcount}명
        </Typography>
      </Grid>
      <Grid xs={4}>
        <TextField
          variant="outlined"
          label="Search"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            이름
          </Typography>
        </Box>
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            점수
          </Typography>
        </Box>
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            이름
          </Typography>
        </Box>
      </Grid>
      <Grid xs={3} sx={{ my: 2 }}>
        <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
          <Typography variant="subtitle" sx={{ padding: 2 }}>
            점수
          </Typography>
        </Box>
      </Grid>
      {attendees?.map((attendee) => {
        const score = scores?.scoreList.filter((n) => n.user_id === attendee.user_id)[0];
        return (
          <>
            <Grid xs={3}>
              <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
                <Typography sx={{ padding: 2 }}>{attendee.user_name}</Typography>
              </Box>
            </Grid>
            <Grid xs={2}>
              <Box fullWidth sx={{ backgroundColor: 'lightgray' }}>
                {!isEditing[attendee.user_id] ? (
                  <Typography sx={{ padding: 2 }}>{score !== undefined ? score.score : 0}</Typography>
                ) : (
                  <TextField name={attendee.user_id} sx={{ py: 1 }} defaultValue={score !== undefined ? score.score : 0} size="small" />
                )}
              </Box>
            </Grid>
            <Grid xs={1}>
              <Box fullWidth sx={{ backgroundColor: 'lightgray', py: 1.57 }}>
                {!isEditing[attendee.user_id] ? (
                  <Button variant="contained" size="small" onClick={(e) => handleEdit(attendee.user_id, e)}>
                    수정
                  </Button>
                ) : (
                  <Button variant="contained" size="small" onClick={(e) => handleEdit(attendee.user_id, e)}>
                    수정완료
                  </Button>
                )}
              </Box>
            </Grid>
            <Box sx={{ position: 'fixed', bottom: '3vh', right: '3vw' }}>
              <Button size="large" variant="outlined" color="error" sx={{ mr: 2 }} onClick={handleDelete}>
                삭제하기
              </Button>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  navigate('add-score');
                }}
              >
                전체성적입력
              </Button>
            </Box>
          </>
        );
      })}
    </Grid>
  );
}
