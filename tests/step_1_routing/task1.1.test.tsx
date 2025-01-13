
import {describe, expect, test} from '@jest/globals';

import { ActivityRoute, HomeRoute, MealsRoute, PersonalInfoRoute, Routes } from '../../src/components/Layout/menuItems';

describe('Routes', () => {
    test('All routes are added', () => {
        const allSlugs = new Set([HomeRoute.slug, MealsRoute.slug, ActivityRoute.slug, PersonalInfoRoute.slug]);
        
        const allRoutes = Routes;
        expect(allRoutes.length).toBe(4);
        
        const allRoutesSlugs = new Set(allRoutes.map(route => route.slug));
        expect(allRoutesSlugs).toEqual(allSlugs);
    });
    
})