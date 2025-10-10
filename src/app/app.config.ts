import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule } from 'lucide-angular';
import { Home, User, Calendar, LogIn, UserPlus, Stethoscope, ChevronRight, MessageSquare, DollarSign,
  MessageCircle, CircleUser, ChevronFirst, Users, Search, ClipboardList, Building, ChevronDown, BanknoteArrowUp,
  ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, Plus, ChevronLeft, HeartHandshake, Receipt, Mail, Lock, Building2,
  Microscope, Menu, EllipsisVertical, X, Pencil, Trash, BriefcaseMedical, ReceiptText, RefreshCw, Calculator,
  CalendarPlus, CalendarCheck, HandCoins
 } from 'lucide-angular/src/icons';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'pt' },
    importProvidersFrom(
      LucideAngularModule.pick({ Home, User, Calendar, LogIn, UserPlus, Stethoscope, ChevronRight, CalendarCheck,
        MessageSquare, MessageCircle, CircleUser, ChevronFirst, Users, Search, ClipboardList, BanknoteArrowUp,
        Building, ChevronDown, ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon, Plus, ChevronLeft, CalendarPlus,
        HeartHandshake, Receipt, Mail, Lock, Building2, Microscope, Menu, EllipsisVertical, X, Pencil, Trash,
        BriefcaseMedical, ReceiptText, RefreshCw, Calculator, DollarSign, HandCoins
       })
    )
  ]
};
