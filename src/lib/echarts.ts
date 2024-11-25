import { registerTheme } from 'echarts';

registerTheme('chalk', {
	color: ['#0f766e', '#4338ca', '#b45309', '#be185d', '#9f1239', '#0e7490', '#15803d', '#b91c1c'],
	backgroundColor: 'rgba(0,0,0,0)',
	textStyle: {},
	title: {
		textStyle: {
			color: '#ffffff'
		},
		subtextStyle: {
			color: '#d4d4d8'
		}
	},
	line: {
		itemStyle: {
			borderWidth: '4'
		},
		lineStyle: {
			width: '3'
		},
		symbolSize: '0',
		symbol: 'roundRect',
		smooth: true
	},
	radar: {
		itemStyle: {
			borderWidth: '4'
		},
		lineStyle: {
			width: '3'
		},
		symbolSize: '0',
		symbol: 'roundRect',
		smooth: true
	},
	bar: {
		itemStyle: {
			barBorderWidth: 0,
			barBorderColor: '#d4d4d8'
		}
	},
	pie: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		}
	},
	scatter: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		}
	},
	boxplot: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		}
	},
	parallel: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		}
	},
	sankey: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		}
	},
	funnel: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		}
	},
	gauge: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		}
	},
	candlestick: {
		itemStyle: {
			color: '#fc97af',
			color0: 'transparent',
			borderColor: '#fc97af',
			borderColor0: '#87f7cf',
			borderWidth: '2'
		}
	},
	graph: {
		itemStyle: {
			borderWidth: 0,
			borderColor: '#d4d4d8'
		},
		lineStyle: {
			width: '1',
			color: '#ffffff'
		},
		symbolSize: '0',
		symbol: 'roundRect',
		smooth: true,
		color: ['#0f766e', '#4338ca', '#b45309', '#be185d', '#9f1239', '#0e7490', '#15803d', '#b91c1c'],
		label: {
			color: '#fafafa'
		}
	},
	map: {
		itemStyle: {
			areaColor: '#f3f3f3',
			borderColor: '#999999',
			borderWidth: 0.5
		},
		label: {
			color: '#893448'
		},
		emphasis: {
			itemStyle: {
				areaColor: 'rgba(255,178,72,1)',
				borderColor: '#eb8146',
				borderWidth: 1
			},
			label: {
				color: 'rgb(137,52,72)'
			}
		}
	},
	geo: {
		itemStyle: {
			areaColor: '#f3f3f3',
			borderColor: '#999999',
			borderWidth: 0.5
		},
		label: {
			color: '#893448'
		},
		emphasis: {
			itemStyle: {
				areaColor: 'rgba(255,178,72,1)',
				borderColor: '#eb8146',
				borderWidth: 1
			},
			label: {
				color: 'rgb(137,52,72)'
			}
		}
	},
	categoryAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: '#52525b'
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: '#333'
			}
		},
		axisLabel: {
			show: true,
			color: '#6b7280'
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: ['#e6e6e6']
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
			}
		}
	},
	valueAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: '#52525b'
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: '#333'
			}
		},
		axisLabel: {
			show: true,
			color: '#6b7280'
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: ['#e6e6e6']
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
			}
		}
	},
	logAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: '#52525b'
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: '#333'
			}
		},
		axisLabel: {
			show: true,
			color: '#6b7280'
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: ['#e6e6e6']
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
			}
		}
	},
	timeAxis: {
		axisLine: {
			show: true,
			lineStyle: {
				color: '#52525b'
			}
		},
		axisTick: {
			show: false,
			lineStyle: {
				color: '#333'
			}
		},
		axisLabel: {
			show: true,
			color: '#6b7280'
		},
		splitLine: {
			show: false,
			lineStyle: {
				color: ['#e6e6e6']
			}
		},
		splitArea: {
			show: false,
			areaStyle: {
				color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
			}
		}
	},
	toolbox: {
		iconStyle: {
			borderColor: '#9ca3af'
		},
		emphasis: {
			iconStyle: {
				borderColor: '#6b7280'
			}
		}
	},
	legend: {
		textStyle: {
			color: '#6b7280'
		}
	},
	tooltip: {
		axisPointer: {
			lineStyle: {
				color: '#d1d5db',
				width: 1
			},
			crossStyle: {
				color: '#d1d5db',
				width: 1
			}
		}
	},
	timeline: {
		lineStyle: {
			color: '#87f7cf',
			width: 1
		},
		itemStyle: {
			color: '#87f7cf',
			borderWidth: 1
		},
		controlStyle: {
			color: '#87f7cf',
			borderColor: '#87f7cf',
			borderWidth: 0.5
		},
		checkpointStyle: {
			color: '#fc97af',
			borderColor: '#fc97af'
		},
		label: {
			color: '#87f7cf'
		},
		emphasis: {
			itemStyle: {
				color: '#f7f494'
			},
			controlStyle: {
				color: '#87f7cf',
				borderColor: '#87f7cf',
				borderWidth: 0.5
			},
			label: {
				color: '#87f7cf'
			}
		}
	},
	visualMap: {
		color: ['#f87171', '#4ade80']
	},
	dataZoom: {
		backgroundColor: 'rgba(255,255,255,0)',
		dataBackgroundColor: 'rgba(114,204,255,1)',
		fillerColor: 'rgba(114,204,255,0.2)',
		handleColor: '#72ccff',
		handleSize: '100%',
		textStyle: {
			color: '#333333'
		}
	},
	markPoint: {
		label: {
			color: '#fafafa'
		},
		emphasis: {
			label: {
				color: '#fafafa'
			}
		}
	}
});
