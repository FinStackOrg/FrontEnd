


export default CardContent () {



    return (
        <Typography className={pctChange.includes("-") ? classes.neg : classes.pos}>
         Daily Change: {pctChange}% {pctChange.includes("-")? <ArrowDownwardIcon /> : <ArrowUpwardIcon/>}
        </Typography>
        {assetClicked &&
            <div style={{ height: 250, width: '100%' }} className={gridStylesLayout.root}>
            {list(assets)}
            </div>
        
        }
      </CardContent>
      <CardActions>
        {assetClicked ? (<Button size="small" onClick={onClickAssets} >Close Assets</Button>)
          : <Button size="small" onClick={onClickAssets} >Show Assets</Button>
        }
        <AlertDialog title = {title} username={username} reload={reload} setReload={setReload}/>
      </CardActions>
    )
}