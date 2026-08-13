import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import type { DemoProps } from './DemoShell'

/**
 * Each demo is code-split, so opening the portfolio page never downloads
 * six applications' worth of JavaScript. Keys match `Project.slug`.
 */
export const demoRegistry: Record<string, LazyExoticComponent<ComponentType<DemoProps>>> = {
  assetflow: lazy(() => import('./assetflow')),
  ethiotractors: lazy(() => import('./ethiotractors')),
  liben: lazy(() => import('./liben')),
  ipms: lazy(() => import('./ipms')),
  fetansms: lazy(() => import('./fetansms')),
  unihub: lazy(() => import('./unihub')),
}
