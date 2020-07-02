import React from "react";
import { Posting } from "../../types";
import { Grid, Card, CardMedia, CardHeader } from "@material-ui/core";

interface Props {
  posting: Posting;
}

export default function PostingItem({ posting }: Props): React.ReactElement {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardMedia image={posting.mainImage} title={posting.title} />
        <div>
          <div>
            <CardHeader title={`$${posting.price}`} subheader={posting.title} />
          </div>
        </div>
      </Card>
    </Grid>
  );
}
