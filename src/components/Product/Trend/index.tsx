import React, { useRef, useState, useEffect, useCallback } from "react";
import * as echarts from 'echarts';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { ProductTrend } from './../../../store/types'
import './index.scss'

interface TrendProps extends ProductTrend {
    loading?: boolean
}

const Trend: React.FC<TrendProps> = (props) => {
    const echartsDom = useRef(null)
    const [chartWidth, setChartWidth] = useState<number>(178)
    const [chart, setChart] = useState<echarts.ECharts | null>()
    const { search_msv, name, growth, update_dt, loading } = props

    const initChart = useCallback(() => {
        if (!chart && !loading && echartsDom?.current) {
            // 初始化chart
            // @ts-ignore
            const chart = echarts.init(echartsDom.current)
            chart.setOption({
                tooltip: {},
                grid: {
                    bottom: 0,
                    left: 0,
                    right: 0
                },
                xAxis: {
                    show: false,
                    data: search_msv?.reduce((p: string[], c) => {
                        p.push(c.date)
                        return p
                    }, [])
                },
                yAxis: {
                    show: false,
                },
                series: [
                    {
                        name: 'sv',
                        type: 'line',
                        data: search_msv?.reduce((p: number[], c) => {
                            p.push(c.sv)
                            return p
                        }, []),
                        lineStyle: {
                            width: 0
                        },
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgb(0, 221, 255)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(77, 119, 255)'
                                }
                            ])
                        },
                    }
                ]
            });
            setChart(chart)
        }
    }, [loading, chart, search_msv])

    /** chart resize */
    const chartResize = useCallback(() => {
        setChartWidth((echartsDom as any).current?.clientWidth)
        chart?.resize()
    }, [chart, echartsDom])

    useEffect(() => {
        window.addEventListener('resize', chartResize)
    }, [chart, chartResize])

    useEffect(() => () => {
        window.removeEventListener('resize', chartResize)
    }, [chartResize])

    useEffect(() => {
        setChartWidth((echartsDom as any).current?.clientWidth)
        initChart()
    }, [echartsDom, initChart])

    useEffect(() => {
        chart?.resize()
    }, [chartWidth, chart])

    return (
        <Grid item xs={12} md={3} sm={6} lg={3} className="trend">
            <Card >
                <CardContent >
                    <div className="trend-header">
                        <h3><small>{name?.split(' ')[0]}</small> {name?.split(' ')[1]}</h3>
                        <small>{growth ? `Growth: ${growth}%` : ''}</small>
                    </div>
                    <div className="trend-chart" style={{ height: chartWidth }} ref={echartsDom} ><Skeleton variant="rect" height={chartWidth} /></div>
                </CardContent>
                <CardActions>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ textAlign: 'center', width: '100%', padding: "0 10px" }}>{loading ? <Skeleton /> : update_dt}</Typography>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Trend