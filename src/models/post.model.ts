import {
  Entity, Column, ManyToMany, ManyToOne,
} from 'typeorm';
import { PostStatus, PostType, ContentType } from '@interfaces/post.interfaces';
import { StandardEntity } from '@models/standard';
import { User } from '@models/user.model';
import { Tag } from '@models/tag.model';

@Entity()
export class Post extends StandardEntity {
  @Column({
    default: PostStatus.draft,
  })
  postStatus: PostStatus;

  @Column({
    default: PostType.ordinary,
  })
  postType: PostType;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    default: ContentType.plainText,
  })
  contentType: ContentType;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  publishedAt: Date;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  content: string;

  @ManyToOne(type => User)
  user: User;

  @ManyToMany(type => Tag, tag => tag.posts)
  tags: Tag[];
}
