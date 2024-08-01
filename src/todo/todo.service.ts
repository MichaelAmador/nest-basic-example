import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del Alma', done: false },
    { id: 2, description: 'Piedra del Tiempo', done: false },
    { id: 3, description: 'Piedra del Espacio', done: true },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateTodoDto): Promise<Todo> {
    try {
      const { id, idCategory, ...rest } = createDto;
      return await this.prisma.todo.create({
        data: {
          ...rest,
          category: { connect: { idcategory: idCategory } },
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createMany(createDto: CreateTodoDto[]) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const inserts = await Promise.all(
          createDto.map(async (newTodo) => {
            const { id, idCategory, ...rest } = newTodo as CreateTodoDto;
            return tx.todo.create({
              data: {
                ...rest,
                category: { connect: { idcategory: idCategory } },
              },
            });
          }),
        );
        return inserts;
      });

      return result;
    } catch (error) {
      console.error(`Error creating todos: ${error}`);
      throw new BadRequestException('Failed to create todos');
    }
  }

  async findAll(): Promise<Todo[]> {
    // return this.todos;

    return await this.prisma.todo.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        description: true,
        done: true,
        category: {
          select: {
            idcategory: true,
            name: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) throw new NotFoundException(`TODO with #${id} not found`);

    return todo;
  }

  async update(idTodo: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { id, idCategory, ...todo } = updateTodoDto;
    return await this.prisma.todo.update({
      where: { id: idTodo },
      data: {
        ...todo,
        category: { connect: { idcategory: idCategory } },
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.todo.update({
      where: { id },
      data: { deleted: true },
    });
  }
}
