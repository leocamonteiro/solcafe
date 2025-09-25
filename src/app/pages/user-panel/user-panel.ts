import { Component, inject } from '@angular/core';
import { LoadingCard } from "../../components/loading-card/loading-card";
import { AuthService } from '../../services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserCard } from "../../components/user-card/user-card";

@Component({
  selector: 'app-user-panel',
  imports: [LoadingCard, UserCard],
  templateUrl: './user-panel.html',
  styleUrl: './user-panel.scss'
})
export class UserPanel {
  authService = inject(AuthService);
  users = toSignal(this.authService.getUsers())
}
