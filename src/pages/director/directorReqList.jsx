import React from 'react';

import { Box, Typography, List, ListItem, ListItemText, Button, Grid } from '@mui/material';

import Director from '../../components/layouts/director';

export default function DirectorReqList() {
  return (
    <Director>
      <Box m={2}>
        <Typography variant="h5" mb={3} p={1}>
          등록 요청 목록
        </Typography>
        <Grid container spacing="10vw">
          <Grid item xs={6}>
            <Typography variant="h6" p={1.5}>
              강사 등록 요청
            </Typography>
            <List sx={{ overflow: 'auto', maxHeight: '50vh', bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary="나미리" secondary="과목: 미적분 1" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="이하람" secondary="과목: 화법과 작문" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="권해담" secondary="과목: 물리 1" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="김대성" secondary="과목: 확률과 통계" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="김대성" secondary="과목: 확률과 통계" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="김대성" secondary="과목: 확률과 통계" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" p={1.5}>
              학생 등록 요청
            </Typography>
            <List sx={{ overflow: 'auto', maxHeight: '50vh', bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemText primary="신짱구" secondary="학부모: 봉미선" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="신짱아" secondary="학부모: 봉미선" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="김철수" secondary="학부모: 김미영" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="이훈이" secondary="학부모: 토마토" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="이훈이" secondary="학부모: 토마토" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
              <ListItem>
                <ListItemText primary="이훈이" secondary="학부모: 토마토" />
                <Button variant="outlined" sx={{ mr: 1 }}>
                  승인
                </Button>
                <Button variant="contained">거절</Button>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>
    </Director>
  );
}
